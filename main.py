from flask import Flask, jsonify,request
import json, requests

app = Flask(__name__)

# Route to serve the static index.html
@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

#Function to return the search results to frontend
@app.route('/search',methods = ['GET'])
def artist_detail():
    artist_name = request.args.get('name')
    artists = artist_list(artist_name)
    details=[]
    if len(artists) == 0:
        return jsonify({'error': 'No match found'}), 404
    else:
        for artist in artists:
            id = artist['_links']['self']['href'].split('/')[-1]
            if artist['_links']['thumbnail']['href'] != '/assets/shared/missing_image.png':
                image = artist['_links']['thumbnail']['href']
            else:
                image = "/static/images/images/artsy_logo.svg"
            name = artist['title']
            details.append({
                'id': id,
                'name': name,
                'image': image
            })
        return jsonify(details)

#Function to get the authentication token
#Currently getting a new token for every request
def authenticate():
    headers =  {"Content-Type":"application/json"}
    cred = {'client_id': "472465794ead6234657d" ,'client_secret':"0ae87f652c6db9a06930aa3770d2183a"}
    response = requests.post("https://api.artsy.net/api/tokens/xapp_token", data=json.dumps(cred), headers=headers)
    return response.json()['token']

#Function to get the search results from Arsty
def artist_list(artist_name):
    token=authenticate()
    headers = {'X-XAPP-Token':token}
    params = {'q':artist_name,'size': 10,'type' :"artist"}
    response = requests.get("https://api.artsy.net/api/search", params=params,headers=headers)
    return response.json().get('_embedded',{}).get('results',[])

#Function to get the artist details from artsy and return to front end
@app.route('/artists/<artist_id>', methods=['GET'])
def artist_details(artist_id):
    token=authenticate()
    headers = {'X-XAPP-Token':token}
    response = requests.get(f"https://api.artsy.net/api/artists/{artist_id}", headers=headers)
    if response.status_code == 200:
        artist = response.json()
        details = {
            "name": artist.get("name", " "),
            "birthday": artist.get("birthday", " "),
            "deathday": artist.get("deathday", " "),
            "nationality": artist.get("nationality", " "),
            "biography": artist.get("biography", " ")
        }
        
        return jsonify(details)


if __name__ == '__main__':
    app.run(debug=True) 

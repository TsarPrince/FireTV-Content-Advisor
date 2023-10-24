from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import json
import requests

openai.api_key = "your_api_key"

def get_genres_based_on_mood(mood):
    response = openai.ChatCompletion.create(
        messages = [
            {"role": "system", "content": """
                you are given a mood and you have to suggest a movie genre based on the mood, the genres should be such that the user feels the mood is satisfied by the genre and your response should be in a json format like below

                {
                    "genres": "action, comedy, drama"
                }

            """},
            {
                "role": "user",
                "content": mood
            }
        ],
        model = "gpt-3.5-turbo"
    )

    try:
        res = response['choices'][0]['message']['content']

        start = res.find('{')
        end = res.rfind('}')

        if start != -1 and end != -1:
            # end+1 because slicing is exclusive at the end
            json_content = res[start:end+1]

            json_content = json.loads(json_content)
            return json_content
        else:
            get_genres_based_on_mood(mood)

    except:
        get_genres_based_on_mood(mood)



def get_movies_imdb(genres):
    formatted_genres = ','.join(genres.split(', ')).lower()
    url = f"https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres={formatted_genres}&with_keywords=happy"

    print(url)
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer your_token"
    }

    response = requests.get(url, headers=headers)

    return response.json()

app = Flask(__name__)
CORS(app)

@app.route('/get_movies', methods=['GET', 'POST'])
def get_movies():
    if request.method == 'POST':
        data = request.get_json()

    print(data['mood'])

    suggestions = get_genres_based_on_mood(data['mood'])

    movies = get_movies_imdb(suggestions['genres'])

    for i in range(len(movies['results'])):
        movies['results'][i]['poster_path'] = f"https://image.tmdb.org/t/p/original{movies['results'][i]['poster_path']}"
        movies['results'][i]['backdrop_path'] = f"https://image.tmdb.org/t/p/original{movies['results'][i]['backdrop_path']}"

    return jsonify(movies)

if __name__ == '__main__':
    app.run(debug=True)

import requests
import json

url = 'https://newsapi.org/v2/top-headlines?country=id&apiKey=2cf93c19895b4b30bb3d3e5cbf88c4a9'
response = requests.get(url)
news_json = json.loads(response.content.decode('utf-8'))

news = json.dumps(news_json['articles'], indent=4)

print(news)

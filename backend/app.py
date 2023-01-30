from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# filter endpoint
@app.route("/api/filter", methods=['POST'])
def filter():
    # TODO: implement filter

    return {"result": ""}, 200


if __name__ == '__main__':
    app.run(debug=True)

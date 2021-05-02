# import sys
# def handler(event, context):
#     return 'Hello from AWS Lambda using Python' + sys.version + '!'  

import json
import numpy as np
from tensorflow.keras.models import load_model
import joblib

# import requests


def return_prediction(model, scaler, sample_json):
  s_len = sample_json["sepal_length"]
  s_wid = sample_json["sepal_width"]
  p_len = sample_json["petal_length"]
  p_wid = sample_json["petal_width"]

  flower=[[s_len, s_wid, p_len, p_wid]]

  classes = np.array(['setosa', 'versicolor', 'virginica'])

  flower = scaler.transform(flower)

#   class_ind = model.predict_classes(flower)[0]
  class_ind = np.argmax(model.predict(flower), axis=-1)[0]
  print('class ind')
  print(class_ind)
  return classes[class_ind]


flower_model = load_model("./final_iris_model.h5")
flower_scaler = joblib.load("./iris_scaler.pkl")

def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """

    # try:
    #     ip = requests.get("http://checkip.amazonaws.com/")
    # except requests.RequestException as e:
    #     # Send some context about this error to Lambda Logs
    #     print(e)

    #     raise e

    print(event)

    sepal_length = event['sepal_length']
    sepal_width = event['sepal_width']
    petal_length = event['petal_length']
    petal_width = event['petal_width']


    flower_example = { "sepal_length": sepal_length,
                  "sepal_width": sepal_width,
                  "petal_length": petal_length,
                  "petal_width": petal_width}

    print('flower example value')
    print(flower_example)

    results = return_prediction(flower_model, flower_scaler, flower_example)
    print(results)
    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "message": results,
                # "location": ip.text.replace("\n", "")
            }
        ),
    }
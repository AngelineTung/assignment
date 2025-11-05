def handler(event, context):
    print("Hello, World!")  # logs
    return {"statusCode": 200, "body": "Hello, World!"}

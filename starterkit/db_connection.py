import pymongo

url = 'mongodb+srv://oylesinebegumiko:7VuqXXwTNvVK1xjy@cluster0.fykr3bu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
pymongo_client = pymongo.MongoClient(url)


def get_db():
    return pymongo_client['hissekar']
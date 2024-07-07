from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ReviewSerializer
import pickle
import os

class ReviewAPIView(APIView):
    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            # Process the data here
            review = serializer.validated_data['review']
            rating = serializer.validated_data['rating']

            print(review)
            print(rating)
            # For example, you can save the data to the database or perform some analysis
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# Load the vectorizer, scaler, and model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(BASE_DIR, 'data/vectorizer.pkl'), 'rb') as f:
    vectorizer = pickle.load(f)
with open(os.path.join(BASE_DIR, 'data/scaler.pkl'), 'rb') as f:
    scaler = pickle.load(f)
with open(os.path.join(BASE_DIR, 'data/model.pkl'), 'rb') as f:
    model = pickle.load(f)


def predict_rating(feedback_text):
    # Vectorize the input text
    feedback_vectorized = vectorizer.transform([feedback_text])
    # Scale the vectorized text
    feedback_scaled = scaler.transform(feedback_vectorized)
    # Predict the rating
    rating = model.predict(feedback_scaled)[0]
    return rating



print(predict_rating("this course was not good as well as not bad"))
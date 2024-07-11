from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ReviewSerializer
import pickle
import os
from django.views.decorators.csrf import csrf_exempt;



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


class ReviewAPIView(APIView):
    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            review = serializer.validated_data['review']
    
            predicted_rating = predict_rating(review)
            
            response_data = serializer.data
            response_data['predicted_rating'] = predicted_rating

            print(predicted_rating)
        
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

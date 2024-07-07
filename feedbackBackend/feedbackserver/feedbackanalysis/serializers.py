from rest_framework import serializers

class ReviewSerializer(serializers.Serializer):
    review = serializers.CharField()
    rating = serializers.IntegerField()

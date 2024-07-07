from django.urls import path
from .views import ReviewAPIView

urlpatterns = [
    path('reviews/', ReviewAPIView.as_view(), name='review-api'),
]

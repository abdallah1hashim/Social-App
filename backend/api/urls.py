from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from . import views

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("posts/", views.post_list_create_view),
    path(
        "posts/<int:pk>/",
        views.retrieve_update_destroy_post_view,
    ),
    path(
        "posts/<int:pk>/like/",
        views.like_change_view,
    ),
    path("user/<int:pk>/", views.public_user_info_view, name="public_user_info"),
]

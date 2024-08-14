from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework import generics, status

from .serializers import PostSerializer, UserPublicSerializer
from .models import Post
from users.models import User

# Create your views here.


class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        print(request.user)
        print(request.headers)
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        return Post.objects.all().order_by("-created_at")


post_list_create_view = PostListCreateView.as_view()


class RetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


retrieve_update_destroy_post_view = RetrieveUpdateDestroyAPIView.as_view()


class LikeChangeView(APIView):
    def patch(self, request, pk):
        like_action = request.data.get("like")

        # Validate the like_action input
        if like_action not in [1, -1]:
            return Response(
                {"message": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            post = Post.objects.get(id=pk)
        except Post.DoesNotExist:
            return Response(
                {"message": "Post not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Handle the like action
        if like_action == 1:
            post.likes.add(request.user)
        elif like_action == -1:
            post.likes.remove(request.user)

        post.save()
        return Response({"message": "success"}, status=status.HTTP_200_OK)


like_change_view = LikeChangeView.as_view()


class PublicUserInfo(generics.RetrieveAPIView):
    serializer_class = UserPublicSerializer
    queryset = User.objects.all()


public_user_info_view = PublicUserInfo.as_view()

# class PostLikeView(APIView):
#     def post(self, request, pk, format=None):
#         post = generics.get_object_or_404(Post, pk=pk)
#         user = request.user

#         if user.is_authenticated:
#             if user in post.likes.all():
#                 post.likes.remove(user)
#                 message = "Post unliked."
#             else:
#                 post.likes.add(user)
#                 message = "Post liked."

#             post.save()
#             return Response({"message": message, "likes_count": post.likes.count()}, status=status.HTTP_200_OK)
#         else:
#             return Response({"error": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED)

from django.db import models
from users.models import User


class Post(models.Model):
    content = models.TextField(blank=False)
    photo = models.ImageField(null=True, blank=True)
    likes = models.ManyToManyField(User)
    comments = models.ManyToManyField("self", blank=True, related_name="comments_for")
    comment_for = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="parent_post",
    )
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="post_author"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.author} | {self.id} | {self.content[0:9]}"

from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    PermissionsMixin,
    AbstractBaseUser,
)


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email=None, password=None):
        if not username:
            raise ValueError("The Username field is required")
        if not password:
            raise ValueError("The Password field is required")

        email = self.normalize_email(email) if email else None
        username = self.model.normalize_username(username)

        user = self.model(username=username, email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None):
        user = self.create_user(username=username, email=email, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=50)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=155)
    pfp = models.ImageField(null=True, blank=True)
    followers = models.ManyToManyField(
        "self", related_name="followed_by", symmetrical=False, blank=True
    )
    followings = models.ManyToManyField(
        "self", related_name="follows", symmetrical=False, blank=True
    )
    is_active = models.BooleanField(
        default=True
    )  # Typically default to True for active users
    last_login = models.DateTimeField(auto_now=True)  # auto_now for last login
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(
        auto_now_add=True
    )  # auto_now_add for creation date

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    objects = CustomUserManager()

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"

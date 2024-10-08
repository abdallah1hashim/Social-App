# Generated by Django 5.0.6 on 2024-08-04 16:27

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_author', to=settings.AUTH_USER_MODEL)),
                ('comment_for', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment_for_post', to='api.post')),
                ('comments', models.ManyToManyField(to='api.post')),
                ('likes', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

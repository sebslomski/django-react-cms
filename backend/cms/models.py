from django.db import models
from polymorphic.models import PolymorphicModel


class Article(models.Model):
    title = models.CharField(max_length=200)


class Section(PolymorphicModel):
    order = models.PositiveIntegerField(default=0, blank=False, null=False)
    article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = [('order', 'article')]
        ordering = ['order']


class TextSection(Section):
    text = models.TextField()


class ImageSection(Section):
    src = models.URLField()

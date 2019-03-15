import graphene

from graphene_django.types import DjangoObjectType

from cms import models


class SectionInterface(graphene.Interface):
    id = graphene.Int()


class TextSection(graphene.ObjectType):
    text = graphene.String()

    class Meta:
        interfaces = (
            SectionInterface,
        )

class ImageSection(graphene.ObjectType):
    src = graphene.String()

    class Meta:
        interfaces = (
            SectionInterface,
        )


class Section(graphene.Union):
    @classmethod
    def resolve_type(cls, instance, info):
        if isinstance(instance, models.TextSection):
            return TextSection

        if isinstance(instance, models.ImageSection):
            return ImageSection

        return None

    class Meta:
        types = (
            TextSection,
            ImageSection,
        )


class Article(DjangoObjectType):
    sections = graphene.List(Section)

    def resolve_sections(self, instance, **kwargs):
        return self.sections.all()

    class Meta:
        model = models.Article


class Query(graphene.ObjectType):
    first_article = graphene.Field(Article)

    article = graphene.Field(
        Article,
        id=graphene.Int(),
    )

    def resolve_first_article(self, info, **kwargs):
        return models.Article.objects.first()

    def resolve_article(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return models.Article.objects.get(id=id)

        return None

schema = graphene.Schema(query=Query)

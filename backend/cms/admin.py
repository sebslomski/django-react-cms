from django.contrib import admin

from polymorphic.admin import (
    PolymorphicParentModelAdmin,
    PolymorphicChildModelAdmin,
    StackedPolymorphicInline,
    PolymorphicInlineSupportMixin,
)

from cms.models import Article, Section, TextSection, ImageSection


@admin.register(TextSection)
class TextSectionAdmin(PolymorphicChildModelAdmin):
    base_model = TextSection


@admin.register(ImageSection)
class ImageSectionAdmin(PolymorphicChildModelAdmin):
    base_model = ImageSection

@admin.register(Section)
class SectionAdmin(PolymorphicParentModelAdmin):
    base_model = Section
    child_models = (
        TextSection,
        ImageSection,
    )

class SectionInline(StackedPolymorphicInline):
    class TextSectionInline(StackedPolymorphicInline.Child):
        model = TextSection

    class ImageSectionInline(StackedPolymorphicInline.Child):
        model = ImageSection

    model = Section
    child_inlines = (
        TextSectionInline,
        ImageSectionInline,
    )

@admin.register(Article)
class ArticleAdmin(PolymorphicInlineSupportMixin, admin.ModelAdmin):
    inlines = (
        SectionInline,
    )

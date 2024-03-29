import React from 'react';

import TextSection from '../TextSection';
import ImageSection from '../ImageSection';
import InlineEditable from '../InlineEditable';

import './Article.css';

const Article = ({
  id,
  title,
  __typename,
  sections,
}) => {
  return (
    <InlineEditable
      modelName={__typename}
      id={id}
    >
      <article className="Article">
        <h1>{title}</h1>
        {sections.map(({ __typename, ...section}) => {
          const SectionComponent = {
            TextSection: TextSection,
            ImageSection: ImageSection,
          }[__typename];

          return (
            <section className="Article__section" key={section.id}>
              <InlineEditable
                modelName={__typename}
                id={section.id}
              >
                <SectionComponent {...section} />
              </InlineEditable>
            </section>
          );
        })}
      </article>
    </InlineEditable>
  );
};

export default Article;

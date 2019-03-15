import React from 'react';

import TextSection from '../TextSection';
import ImageSection from '../ImageSection';
import InlineEditable from '../InlineEditable';

import './Article.css';

const Article = ({
  id,
  title,
  sections,
}) => {
  return (
    <InlineEditable
      modelName="article"
      id={id}
    >
      <article className="Article">
        <h1>{title}</h1>
        {sections.map(({ modelName, ...section}) => {
          const SectionComponent = {
            textsection: TextSection,
            imagesection: ImageSection,
          }[modelName];

          return (
            <section className="Article__section" key={section.id}>
              <InlineEditable
                modelName="section"
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

import React from 'react';

import TextSection from '../TextSection';
import ImageSection from '../ImageSection';

import './Article.css';

const Article = ({
  id,
  sections,
}) => {
  return (
    <article class="Article">
      {sections.map(({ type, ...section}) => {
        const SectionComponent = {
          text: TextSection,
          image: ImageSection,
        }[type];

        return (
          <section class="Article__section">
            <SectionComponent {...section} />
          </section>
        );
      })}
    </article>
  );
};

export default Article;

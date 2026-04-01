import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {useLocation, useHistory} from '@docusaurus/router';
import type {Props} from '@theme/BlogListPage';
import type {PropBlogPostContent} from '@docusaurus/plugin-content-blog';
import PageHero from '@site/src/components/PageHero';
import styles from './styles.module.css';

const CLOUD_TAG = 'hindsight-cloud';
const CLOUD_PREVIEW_COUNT = 3;
const HINDSIGHT_PAGE_SIZE = 9;

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
}

function BlogCard({content}: {content: PropBlogPostContent}) {
  const {metadata, assets} = content;
  const {title, description, date, readingTime, permalink, frontMatter} = metadata;
  const image = assets.image ?? frontMatter.image ?? '/img/blog-default.jpg';

  return (
    <Link to={permalink} className={styles.card}>
      <div className={styles.cardImageWrapper}>
        {image ? (
          <img src={image} alt={title} className={styles.cardImage} />
        ) : (
          <div className={styles.cardImagePlaceholder} />
        )}
      </div>
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>{title}</h2>
        {description && <p className={styles.cardDescription}>{description}</p>}
        <div className={styles.cardFooter}>
          <span className={styles.cardDate}>{formatDate(date)}</span>
          {readingTime !== undefined && (
            <span className={styles.cardReadTime}>{Math.ceil(readingTime)} min read</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function SectionHeader({title, subtitle, viewAllHref}: {title: string; subtitle?: string; viewAllHref?: string}) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.sectionHeaderRow}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {viewAllHref && (
          <Link to={viewAllHref} className={styles.sectionViewAll}>
            View all →
          </Link>
        )}
      </div>
      {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
    </div>
  );
}

export default function BlogListPage({items, metadata}: Props): React.ReactElement {
  const {blogTitle, blogDescription} = metadata;
  const location = useLocation();
  const history = useHistory();

  const currentPage = Math.max(1, parseInt(new URLSearchParams(location.search).get('page') ?? '1', 10));

  const cloudPosts = items.filter(({content}) =>
    (content.metadata.tags ?? []).some((t) => t.label === CLOUD_TAG),
  );
  const hindsightPosts = items.filter(({content}) =>
    !(content.metadata.tags ?? []).some((t) => t.label === CLOUD_TAG),
  );

  const totalHindsightPages = Math.max(1, Math.ceil(hindsightPosts.length / HINDSIGHT_PAGE_SIZE));
  const hindsightPagePosts = hindsightPosts.slice(
    (currentPage - 1) * HINDSIGHT_PAGE_SIZE,
    currentPage * HINDSIGHT_PAGE_SIZE,
  );

  const goToPage = (page: number) => {
    const params = new URLSearchParams(location.search);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const search = params.toString();
    history.push({pathname: location.pathname, search: search ? `?${search}` : ''});
  };

  return (
    <Layout title={blogTitle} description={blogDescription}>
      <main className={styles.blogPage}>
        <PageHero title={blogTitle} subtitle={blogDescription} />

        {currentPage === 1 && cloudPosts.length > 0 && (
          <section className={styles.section}>
            <SectionHeader
              title="Hindsight Cloud"
              subtitle="News and updates from Hindsight Cloud"
              viewAllHref={cloudPosts.length > CLOUD_PREVIEW_COUNT ? `/blog/tags/${CLOUD_TAG}` : undefined}
            />
            <div className={styles.grid}>
              {cloudPosts.slice(0, CLOUD_PREVIEW_COUNT).map(({content: BlogPostContent}) => (
                <BlogCard key={BlogPostContent.metadata.permalink} content={BlogPostContent} />
              ))}
            </div>
          </section>
        )}

        {hindsightPagePosts.length > 0 && (
          <section className={styles.section}>
            <SectionHeader
              title="Hindsight"
              subtitle="Releases, guides, and deep dives into agent memory"
            />
            <div className={styles.grid}>
              {hindsightPagePosts.map(({content: BlogPostContent}) => (
                <BlogCard key={BlogPostContent.metadata.permalink} content={BlogPostContent} />
              ))}
            </div>
          </section>
        )}

        {totalHindsightPages > 1 && (
          <nav className={styles.pagination}>
            {currentPage > 1 && (
              <button onClick={() => goToPage(currentPage - 1)} className={styles.paginationButton}>
                ← Previous
              </button>
            )}
            <span className={styles.paginationInfo}>
              Page {currentPage} of {totalHindsightPages}
            </span>
            {currentPage < totalHindsightPages && (
              <button onClick={() => goToPage(currentPage + 1)} className={styles.paginationButton}>
                Next →
              </button>
            )}
          </nav>
        )}
      </main>
    </Layout>
  );
}

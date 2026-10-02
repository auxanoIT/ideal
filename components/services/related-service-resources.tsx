import Image from 'next/image';
import Link from 'next/link';
import type { RelatedServicePost } from '@/lib/types';
import styles from './related-service-resources.module.css';

export function RelatedServiceResources({title,posts}: {title:string;posts:RelatedServicePost[]}) {
  if (!posts.length) return null;
  return <section className={styles.section} aria-labelledby="related-resources-heading">
    <div className={styles.wrap}>
      <h2 id="related-resources-heading">Related {title} Resources</h2>
      <ul className={styles.track} tabIndex={0} aria-label={`Articles about ${title}`}>
        {posts.map(post => <li className={styles.item} key={post.slug}>
          <Link className={styles.card} href={`/blog/${post.slug}`}>
            {post.coverImage?.src && <div className={styles.image}>
              <Image src={post.coverImage.src} alt={post.coverImage.alt ?? ''} fill sizes="(max-width:600px) 82vw, (max-width:900px) 46vw, (max-width:1200px) 30vw, 340px" />
            </div>}
            <h3>{post.title}</h3>
          </Link>
        </li>)}
      </ul>
    </div>
  </section>;
}

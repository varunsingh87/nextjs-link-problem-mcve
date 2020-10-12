import Link from 'next/link';

export default function ArticleList(props) {
    return (
        <ul className="grid">
            {props.articles.map(item => (
                <div className={styles.card} key={item.id}>
                    <Link key={item.id} href="/articles/[title]" as={`/articles/${item.title}`}>
                        <a>
                            <p><strong>{item.title}</strong></p><p>{item.body.substring(0, 100)}</p>
                        </a>
                    </Link>                    
                </div>
            ))}
        </ul>
    );
}
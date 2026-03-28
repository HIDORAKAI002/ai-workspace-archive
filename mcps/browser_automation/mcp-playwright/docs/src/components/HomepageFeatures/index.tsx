import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/easy-to-use.svg').default,
    description: (
      <>
        Playwright MCP Server is easy to use, just change the Claude config file and you are done.
      </>
    ),
  },
  {
    title: 'Test UI and APIs',
    Svg: require('@site/static/img/playwright.svg').default,
    description: (
      <>
       Test both UI and API of your application with plain English text. No <code>code</code> required.
      </>
    ),
  },
  {
    title: 'Powered by NodeJS',
    Svg: require('@site/static/img/node.svg').default,
    description: (
      <>
       Playwright MCP Server is built on top of NodeJS, making it fast and efficient.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

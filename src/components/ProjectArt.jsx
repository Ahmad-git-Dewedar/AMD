import { nameOf } from '../data/projects';

/**
 * A project's logo as a square tile. Full artworks fill the tile edge to edge;
 * marks such as Mizan's and Veltrix's sit centred on a panel of their own colour
 */
export function ProjectArt({ project, lang = 'en', small = false, className = '', style, eager = false }) {
  const { logo } = project;
  const src = small ? logo.small || logo.src : logo.src;
  return (
    <div
      className={`project-art${logo.art ? ' project-art--full' : ' project-art--mark'}${logo.light ? ' is-light' : ''} ${className}`}
      style={{ '--logo-bg': logo.bg, '--logo-size': logo.size ? `${logo.size}%` : undefined, ...style }}
    >
      <img
        src={src}
        alt={small ? '' : `${nameOf(project, lang)} logo`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        width={logo.art ? 900 : undefined}
        height={logo.art ? 900 : undefined}
      />
    </div>
  );
}

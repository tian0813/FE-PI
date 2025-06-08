type ShowProps = {
  when: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const Show = ({ when, children, fallback }: ShowProps) => {
  if (when) {
    return children;
  }
  return fallback || null;
}

export default Show;
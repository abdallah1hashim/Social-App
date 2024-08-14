type ContainerProps = React.ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode;
  className?: string;
};

function Container({ children, className = "", ...rest }: ContainerProps) {
  return (
    <div className={`m-auto container ${className}`} {...rest}>
      {children}
    </div>
  );
}

export default Container;

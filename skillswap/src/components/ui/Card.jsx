const Card = ({ children, className }) => {
    return (
        <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
            {children}
        </div>
    );
};

const CardContent = ({ children }) => {
    return <div className="p-2">{children}</div>;
};

export { Card, CardContent };

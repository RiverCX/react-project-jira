export const Mark = ({ str, keyword }: { str: string; keyword: string }) => {
  const arr = str.split(keyword);
  return (
    <>
      {arr.map((item, index) => (
        <span key={index}>
          {item === "" ? (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          ) : (
            item
          )}
        </span>
      ))}
    </>
  );
};

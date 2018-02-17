export default ({ create }) => {
  const handleClick = (e) => {
    console.log('got here');
    create({
      name: 'test',
      logic: [
        [{ type: 'address', value: '0x2c86c11246f7ba5d405562cf12bf17a9297b9af5' }],
      ],
    });
  };
  return (
    <button onClick={handleClick}>create subscription</button>
  );
}

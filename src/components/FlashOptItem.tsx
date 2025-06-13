type FlashOptItemProps = {
  flashAnswer: string;
};

function FlashOptItem({ flashAnswer }: FlashOptItemProps) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: flashAnswer }} />
    </div>
  );
}
export default FlashOptItem;

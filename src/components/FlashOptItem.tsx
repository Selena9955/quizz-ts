type FlashOptItemProps = {
  flashAnswer: string;
  showAnswer: boolean;
};

function FlashOptItem({ flashAnswer, showAnswer }: FlashOptItemProps) {
  return (
    <div>
      {showAnswer && (
        <div
          className="[&_img]:mx-auto [&_img]:block"
          dangerouslySetInnerHTML={{ __html: flashAnswer }}
        />
      )}
    </div>
  );
}
export default FlashOptItem;

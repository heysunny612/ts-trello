import { Droppable } from 'react-beautiful-dnd';
import { BsTrash2Fill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';

export default function DroppableBin() {
  return (
    <Droppable droppableId='bin'>
      {(provided, snapshot) => (
        <article
          className={`todos__bin ${snapshot.isDraggingOver ? 'over' : null}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {/* {provided.placeholder} */}
          <BsTrash2Fill />
        </article>
      )}
    </Droppable>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Card, Overlay, LastUpdate } from './components';
import useFetchData from './hooks/useFetchData';
import useLocalStorage from './hooks/useLocalStorage';
import { ITEMS_API } from './constants/constant';
import { formatTimeSince } from './utils/utils';

import './App.css';

const App: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const { items, setItems } = useFetchData();
  const isDirty = useRef(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [timeSinceLastSaved, setTimeSinceLastSaved] = useState<string>('');
  useLocalStorage();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceLastSaved(formatTimeSince(lastSavedTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSavedTime]);

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, []);

  const saveData = async (updatedItems: typeof items) => {
    try {
      await fetch(ITEMS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItems),
      });
      setLastSavedTime(new Date());
      isDirty.current = false;
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.position === active.id);
      const newIndex = items.findIndex((item) => item.position === over.id);
      const updatedItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
        ...item,
        position: index + 1,
      }));

      setItems(updatedItems);
      isDirty.current = true;

      // Clear any existing timeout to debounce the API call
      if (saveTimeout.current) clearTimeout(saveTimeout.current);

      // Set a new timeout to save data after 5 seconds
      saveTimeout.current = setTimeout(() => {
        saveData(updatedItems);
      }, 5000);
    }
  };

  return (
    <div className='flex flex-col'>
      <LastUpdate time={timeSinceLastSaved || 'Not yet saved'} />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.position)} strategy={rectSortingStrategy}>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[100px] p-6 justify-items-center'>
            {items.map((ele, index) => (
              <Card
                key={index}
                id={ele?.position}
                title={ele?.title}
                image={`/react-dnd-fe${ele.image}`}
                onClick={() => setSelected(ele.image)}
              />
            ))}
          </div>
          {selected && <Overlay image={selected} onClose={() => setSelected(null)} />}
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default App;
import React, { useState } from 'react'
import DataContainer from '../../Components/DataContainer';

function ProfileEvents() {

  const [eventList, setEventList] = useState([]);



      if (eventList === null || eventList.length === 0) {
        return (
          <>
            <div className="h-10 flex items-center justify-center">
              <p>You're not following any events. Search events </p>
            </div>
          </>
        );
      }
  return (
    <DataContainer >

    </DataContainer>
  )
}

export default ProfileEvents;      
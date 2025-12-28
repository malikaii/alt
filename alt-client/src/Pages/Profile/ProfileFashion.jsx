import React, { useState } from 'react'
import DataContainer from '../../Components/DataContainer';

function ProfileFashion() {

  const [fashionItems, setFashionItems] = useState([])

        if (fashionItems === null || fashionItems.length === 0) {
          return (
            <>
              <div className="h-10 flex items-center justify-center">
                <p>No fashion posts made yet. Post some now to get started!</p>
              </div>
            </>
          );
        }
  return (
    <DataContainer>

    </DataContainer>
  )
}

export default ProfileFashion;   
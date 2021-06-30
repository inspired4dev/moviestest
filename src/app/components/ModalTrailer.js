import React from 'react';
import {Modal} from 'reactstrap';

function ModalTrailer ({modalTrailer,toggleTrailer,trailer}){
    return (
        <Modal
        size="lg"
        style={{ maxWidth: "1080px", width: "80%" }}
        isOpen={modalTrailer}
        toggle={toggleTrailer}
      >
        <iframe
          width="1080"
          height="720"
          src={`https://www.youtube.com/embed/${trailer}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
    )
}

export default ModalTrailer;
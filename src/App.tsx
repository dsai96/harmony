import React, { useState } from 'react';
import './App.css';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import { CircularProgress, DialogTitle, Divider, FormControl, FormLabel, Input, ModalDialog, Stack } from '@mui/joy';
import Header from './components/Header';
import logo from './logo.png';

enum RoomAction {
  Create = "Create",
  Join = "Join"
};

type UserData = {
  name: string;
  // any need for server/client mantain the same id?
  id: string;
  roomId: string;
  isHost: boolean;
}


async function joinRoom(userName: string, room: string, isHost: boolean): Promise<UserData> {
  const url = `https://consensys-93520259f634.herokuapp.com/api/createUser?userName=${userName}&roomId=${room}`;
  const response = await fetch(url, { method: "POST",  headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userName: userName, roomId: room }) });
  const newData = await response.json();
  const userId = newData.user_id;
  return {
    id: userId,
    name: userName,
    roomId: room,
    isHost
  }
}

async function createAndJoinRoomAsHost(userName: string): Promise<UserData> {
  const url = `https://consensys-93520259f634.herokuapp.com/api/createRoom?user=${userName}`;
  const response = await fetch(url, { method: "POST" });
  const newData = await response.json();
  const roomId = newData.room_id;
  return await joinRoom(userName, roomId, true);
}


function App() {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState<string>('');
  const [userData, setUserData] = useState<UserData>();
  const [err, setErr] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      userName: (event.currentTarget[0] as HTMLInputElement).value,
      roomId: (event.currentTarget[1] as HTMLInputElement).value
    }
    
    try {
      switch (dialogOpen) {
        case (RoomAction.Create): 
          setUserData(await createAndJoinRoomAsHost(data.userName));
          break;
        case (RoomAction.Join):
          setUserData(await joinRoom(data.userName, data.roomId, false));
          break;
      }
    } catch (err: unknown) {
        if (err instanceof Error) {
          setErr(`Things exploded: ${err.name} ${err.message}`);
        };
    } finally {
      console.log(userData);
      setLoading(false);
      setDialogOpen('');
    }
  };

  const userDataDiv = <div>
    {`Name: ${userData?.name}`}<Divider/>
    {`Host: ${userData?.isHost}`} &nbsp;<Divider/>
    {`Room Code: ${userData?.roomId}`}<Divider/>
  </div>
  return (
    <div className="App">
      <Header/>
      <img src={logo} alt="logo"/>
      <div>
          <Button id='button' onClick={() => setDialogOpen(RoomAction.Create)} size="lg" color="primary" variant="solid">Create Room</Button>
          <Button id='button' onClick={() => setDialogOpen(RoomAction.Join)} size="lg" color="primary" variant="solid">Join Room</Button>
      </div>
      <div className="modal">
              <Modal
                  open={!!dialogOpen}
                  onClose={() => setDialogOpen('')}
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                  <ModalDialog>
                      <DialogTitle>{dialogOpen} Room</DialogTitle>
                      <Stack 
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={2}
                      >
                      {loading ? <CircularProgress size="sm" /> :
                          <form
                              onSubmit={handleSubmit}
                          >
                                  <FormControl>
                                      <FormLabel>Your Name</FormLabel>
                                      <Input autoFocus required />
                                  </FormControl>
                                  {dialogOpen === RoomAction.Join ?
                                      <FormControl>
                                          <FormLabel>Room Code</FormLabel>
                                          <Input required />
                                      </FormControl> : undefined}
                                      <Divider/>
                                  <Button type="submit">Let's go!</Button>
                          </form>}
                    </Stack>
                  </ModalDialog>
              </Modal>
      </div>
      { userData ? userDataDiv : undefined }
      { err }
    </div>
  );
}

export default App;

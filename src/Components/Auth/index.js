import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import DefaultPreference from 'react-native-default-preference';

import styled from 'styled-components';
import MainStack from '@components/MainStack';

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: white;
`;
const Logo = styled.Image`
  height: 90px;
  align-self: center;
  resize-mode: contain;
  margin-bottom: 30px;
`;
const FieldArea = styled.KeyboardAvoidingView`
  align-self: center;
  justify-content: center;
  margin-horizontal: 30px;
  width: 250px;
  margin-top: 150px;
`;
const Label = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;
const Input = styled.TextInput`
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  background-color: #eeeeee;
  padding: 10px;
  margin-top: 6px;
  margin-bottom: 20px;
`;
const Button = styled.TouchableOpacity`
  background-color: #ffb500;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
const ButtonArea = styled.View`
  height: 50px;
  flex-direction: row;
  margin-top: 10px;
`;
const ButtonSpace = styled.View`
  width: 10px;
`;
const Auth = ({}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigation = useNavigation();

  DefaultPreference.get('token').then(t => {
    if (t && (token == null || token == '')) {
      setToken(t);
    }
  });

  // MAIN STACK
  if (token != null && token != '') {
    return <MainStack />;
  }

  const login = () => {};

  return (
    <Container>
      <FieldArea>
        <Logo source={require('@icon/360.png')} />
        <Label>Phone number or ID</Label>
        <Input onChangeText={text => setUsername(text)} />
        <Label>Password</Label>
        <Input onChangeText={text => setPassword(text)} secureTextEntry />

        <ButtonArea>
          <Button onPress={login}>
            <Label>Login</Label>
          </Button>
          <ButtonSpace />
          <Button onPress={() => navigation.navigate('Register')}>
            <Label>Register</Label>
          </Button>
        </ButtonArea>
      </FieldArea>
    </Container>
  );
};

export default React.memo(Auth);

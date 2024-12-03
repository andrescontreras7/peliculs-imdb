import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { supabase } from '../supabase/supabase';
import { WebView } from 'react-native-webview';

export default function GoogleLogin() {
  const [authUrl, setAuthUrl] = useState(null);

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error during sign-in:', error);
      return;
    }

    setAuthUrl(data.url);
  };

  return (
    <View style={styles.container}>
      {!authUrl ? (
        <Button title="Login with Google" onPress={signInWithGoogle} />
      ) : (
        <WebView
          source={{ uri: authUrl }}
          onNavigationStateChange={(event) => {
            if (event.url.includes('https://<your-project>.supabase.co/auth/v1/callback')) {
              setAuthUrl(null); // Cierra la WebView al completar la autenticación
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

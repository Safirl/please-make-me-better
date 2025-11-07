/**
 * Here we'll have a switch selecting the right button component.
 * 
 */

/**
 * Example of link with expo to handle both web and native behavior
 */
import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { buttonExampleStyles } from "./style";


type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      style={buttonExampleStyles.scope}
      {...rest}
      href={href}
      onPress={async (event: GestureResponderEvent) => {
        if (process.env.EXPO_OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}
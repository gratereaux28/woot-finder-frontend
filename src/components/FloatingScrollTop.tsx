import { ActionIcon, Affix, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';

export function FloatingScrollTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 24, right: 24 }}>
      <Transition transition="slide-up" mounted={scroll.y > 420}>
        {transitionStyles => (
          <ActionIcon
            size="xl"
            radius="xl"
            variant="filled"
            color="orange"
            style={transitionStyles}
            aria-label="Back to top"
            onClick={() => scrollTo({ y: 0 })}
          >
            <IconArrowUp size={22} stroke={1.8} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}

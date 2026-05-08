import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';

import classes from './UserButton.module.css';

type UserButtonProps = {
  totalProducts: number;
};

export function UserButton({ totalProducts }: UserButtonProps) {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar color="blue" radius="xl">
          WF
        </Avatar>

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Woot Finder
          </Text>

          <Text c="dimmed" size="xs">
            {totalProducts.toLocaleString('en-US')} products
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}

import React from 'react';
import {
  ActionIcon,
  Button,
  Code,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { Check, ChevronLeft, X } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import ResourceURL from '../../constants/ResourceURL';
import FetchUtils from '../../utils/FetchUtils';
import { ProvinceRequest, ProvinceResponse } from './Configs';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Tên tỉnh thành có ít nhất 2 ký tự' }),
  code: z.string().max(35, { message: 'Mã tỉnh thành chỉ có nhiều nhất 35 ký tự' }),
});

const initialFormValues = {
  name: '',
  code: ''
}

export default function CreateProvince() {
  const form = useForm({
    schema: zodResolver(formSchema),
    initialValues: initialFormValues,
  });

  const handleFormSubmit = form.onSubmit(requestBody => {
    FetchUtils.create<ProvinceRequest, ProvinceResponse>(ResourceURL.PROVINCE, requestBody)
      .then(([responseStatus, responseBody]) => {
        if (responseStatus === 201) {
          showNotification({
            title: 'Thông báo',
            message: 'Tạo thành công',
            autoClose: 5000,
            icon: <Check size={18}/>,
            color: 'teal',
          });
        }
        if (responseStatus === 500) {
          showNotification({
            title: 'Thông báo',
            message: 'Tạo không thành công',
            autoClose: 5000,
            icon: <X size={18}/>,
            color: 'red',
          });
        }
      });
  });

  return (
    <Stack sx={{ maxWidth: 800 }}>
      <Group spacing="xs">
        <ActionIcon
          component={Link}
          to="../address/province"
          color="blue"
          variant="filled"
        >
          <ChevronLeft/>
        </ActionIcon>
        <Title order={3}>Thêm tỉnh thành</Title>
      </Group>

      <Paper shadow="xs" p="sm">
        <Group spacing="xl">
          <Stack spacing={5}>
            <Text>ID</Text>
            <Text><Code color="blue">__</Code></Text>
          </Stack>
          <Stack spacing={5}>
            <Text>Ngày tạo</Text>
            <Text><Code color="blue">__/__/____</Code></Text>
          </Stack>
          <Stack spacing={5}>
            <Text>Ngày cập nhật</Text>
            <Text><Code color="blue">__/__/____</Code></Text>
          </Stack>
          <Stack spacing={5}>
            <Text>Người tạo</Text>
            <Text><Code color="blue">1</Code></Text>
          </Stack>
          <Stack spacing={5}>
            <Text>Người cập nhật</Text>
            <Text><Code color="blue">1</Code></Text>
          </Stack>
        </Group>
      </Paper>

      <form onSubmit={handleFormSubmit}>
        <Paper shadow="xs">
          <Stack spacing={0}>
            <SimpleGrid p="sm" mb="xs" spacing="md" breakpoints={[{ minWidth: 'xs', cols: 2 }]}>
              <TextInput
                required
                label="Tên tỉnh thành"
                {...form.getInputProps('name')}
              />
              <TextInput
                required
                label="Mã tỉnh thành"
                {...form.getInputProps('code')}
              />
            </SimpleGrid>

            <Divider/>

            <Group position="apart" p="sm">
              <Button variant="default" onClick={() => form.reset()}>Tẩy trống</Button>
              <Button type="submit">Thêm</Button>
            </Group>
          </Stack>
        </Paper>
      </form>
    </Stack>
  )
}

import React, { ReactElement } from 'react'
import PageErrorBoundary from 'src/components/PageErrorBoundary'
import { Table, Typography } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { Maybe, Track, usePlaylistQuery } from '../types/api'
import { useParams } from 'react-router'

export default function PlaylistPage(): ReactElement<{}> {
  const { id } = useParams<{ id: string }>()
  const { data, loading } = usePlaylistQuery({ variables: { id } })

  const columns: ColumnProps<Maybe<Track>>[] = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: ['id'],
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: ['name'],
    },
  ]

  return (
    <PageErrorBoundary>
      <Typography.Title level={1}>{data?.playlist?.name}</Typography.Title>
      <Table
        rowKey={'id'}
        size={'small'}
        loading={loading}
        bordered={true}
        rowSelection={{ columnTitle: true, selections: true }}
        columns={columns}
        dataSource={data?.playlist?.tracks}
        pagination={{
          defaultPageSize: 15,
          position: ['topRight', 'bottomRight'],
          showLessItems: true,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </PageErrorBoundary>
  )
}

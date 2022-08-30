import { Pagination, Table } from "ant-design-vue";
import { defineComponent, onMounted, reactive } from "vue";
import { getPets, PaginationDto, PetDto } from "./services/pet";

export const App = defineComponent({
  setup() {
    const data = reactive<{
      loading: boolean;
      source: PaginationDto<PetDto>;
    }>({
      loading: false,
      source: {
        total: 0,
        size: 20,
        page: 1,
        list: [],
      },
    });
    const getList = (size: number, page: number) => {
      data.loading = true;
      getPets(size, page).then((res) => {
        data.loading = false;
        data.source = res;
      });
    };
    onMounted(() => {
      getList(20, 1);
    });
    return () => (
      <div style={{ padding: "16px", backgroundColor: "#fff" }}>
        <Table
          size="small"
          scroll={{ y: "500px" }}
          pagination={false}
          columns={[
            {
              title: "姓名",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "生日",
              dataIndex: "birth",
              key: "birth",
            },
            {
              title: "城市",
              dataIndex: "city",
              key: "city",
            },
          ]}
          loading={data.loading}
          dataSource={data.source.list}
        />
        <Pagination
          size="small"
          total={data.source.total}
          pageSize={data.source.size}
          current={data.source.page}
          showSizeChanger
          showQuickJumper={true}
          showTotal={(total) => <span>共{total}项</span>}
          onChange={(page, pageSize) => {
            getList(pageSize, page);
          }}
        />
      </div>
    );
  },
});

import { mount } from "@vue/test-utils";
import NetflixSearch from "./NetflixSearch.vue";

describe("NetflixSearch", () => {
  it("should display header text", () => {
    const title = "Netflix searcch";
    const wrapper = mount(NetflixSearch, { props: { title } });
    expect(wrapper.find("h1").text()).toEqual(title);
  });
});
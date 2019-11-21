<template>
  <div>
    <div class="d-flex">
      <div class="d-flex flex-column align-items-center pt-4">
        <img src="../assets/up.png" style="width:40px" class="icons">
        <img src="../assets/up2.png" style="width:40px" class="icons">
        <h4 class="m-0">-1</h4>
        <img src="../assets/down.png" style="width:40px" class="icons">
        <img src="../assets/down2.png" style="width:40px" class="icons">   
      </div>
      <div class="ml-3 pt-4">
        <div v-html="test"></div>
        <div class="d-flex justify-content-end">
          <div class="d-flex flex-column">
            <small>3 mins ago</small>
            <small>Author: Indra</small>
          </div>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  data(){
    return{
      test: '<p>This article is the follow up of&nbsp;<a href="https://medium.com/@Cygnus_Network/cygnus-marketplace-advertising-ff5eaff5b07c" target="_blank" style="color: inherit;">Cygnus marketplace advertising</a>.</p><p>Cygnus marketplace, in its business model, integrates advertising directly on the platfrom, at the moment includes :</p><ul><li>Sponsored products &amp; services;</li><li>Sponsored stores/sellers;</li><li>In-page banner ads for internal &amp; external sellers;</li><li>Temporary in-page banner ads from other ad networks;</li><li>Directories memebership;</li><li>Directories sponsored individuals/companies;</li><li>Cygnus video rewards;</li></ul><p>Eventually we will expand our advertising section in a full-advertising global ecosystem which makes easy for businesses &amp; individuals to advertise and publish content while removing middlemen trough the blockchain allowing hundreds of billions of dollars to be saved each year.</p><p>Also Cygnus connects advertisers &amp; publishers together by creating an advertising ecosystem powered by the network of users on the platform :</p><ul><li>Marketing services in the digital services section provide the tools to start a successfull marketing campaign able to expose any kind of business or individual to millions of people worldwide.</li><li>Inside the directories you are able to find any kind of marketing-related business or individual which will help to market your products &amp; services to millions of people worldwide.</li></ul><p>If all this wasn’t enough, Cygnus exposes any business, individual, product or service listed on Cygnus marketplace to Cygnus personal marketing strategies and cash resources worth up to billions of dollars spent on marketing, which allow the platform to be filled with millions of users from allover the world looking exactly to purchase the products or services listed on the platform and so empower the sellers within the ecosystem.</p><p>With this integration, Cygnus aims to disrupt the current advertising model and enable everyone to connect with the right people and the right enviroment to access a new world of opportunities and freedom.</p>'
    }
  }
}
</script>

<style>

</style>
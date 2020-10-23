<% for(var i=0; i<casinoOwner.length; i++) {%>

<h3>Casino Statistics</h3>
<ul>
<% for(var i=0; i<casinoOwner.length; i++) {%>
  <li>
    <span>Casino Bank :</span>
    <span><%= casinoOwner[i].casinoBalance %></span>
    <span>Customer Win Count :</span>
    <span><%= casinoOwner[i].winCount %></span>
    <span><%= casinoOwner[i].lossCount %></span>
    <span><i class="fas fa-pencil-alt" aria-hidden="true"></i></span>
    <span><i class="fa fa-trash" aria-hidden="true"></i></span>
  </li>
  <% } %>
<% } %>
</ul>

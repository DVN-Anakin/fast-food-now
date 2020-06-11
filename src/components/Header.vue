<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light static-top">
            <div class="container">
                <router-link class="navbar-brand" :to="{ name: 'homeLink' }">
                    <img src="../assets/img/logo.png" alt="FAST FOOD NOW logo">
                    <span>FAST FOOD NOW</span>
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <router-link tag="li" :to="{ name: 'homeLink' }" class="nav-item">
                            <a class="nav-link">Home</a>
                        </router-link>
                        <li class="nav-item nav-item--dropdown">
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown">About <b class="caret"></b></a>
                            <ul class="dropdown-menu multi-level">
                                <router-link tag="li" :to="{ name: 'orderingGuideLink' }" class="nav-item">
                                    <a class="nav-link">Ordering Guide</a>
                                </router-link>
                                <router-link tag="li" :to="{ name: 'deliveryLink' }" class="nav-item">
                                    <a class="nav-link">Delivery</a>
                                </router-link>
                                <router-link tag="li" :to="{ name: 'historyLink' }" class="nav-item">
                                    <a class="nav-link">History</a>
                                </router-link>
                            </ul>
                        </li>
                        <router-link tag="li" :to="{ name: 'menuLink' }" class="nav-item">
                            <a class="nav-link">Menu</a>
                        </router-link>
                        <router-link tag="li" :to="{ name: 'contactLink' }" class="nav-item">
                            <a class="nav-link">Contact</a>
                        </router-link>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    .navbar-brand {
        margin: 0;
    }

    .navbar-brand img {
        height: 50px;
        padding: 0 3px 0 0;
    }

    .navbar-brand span {
        vertical-align: text-top;
    }

    #navbarResponsive li {
        position: relative;
    }

    .nav-item--dropdown:hover .dropdown-menu.multi-level {
        display: block;
    }

    .dropdown-menu.multi-level:hover {
        display: block;
    }

    .nav-item--dropdown,
    .nav-item--dropdown a {
        cursor: pointer;
    }

    .dropdown-menu.multi-level {
        text-align: center;
    }

    @media (min-width: 992px) {
        
        .dropdown-menu.multi-level {
            text-align: left;
            top: 35px;
        }
    }
</style>
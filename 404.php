<!DOCTYPE html>
<html lang="es">

<?php include 'php/header.php'; ?>

<header class="header">
         <div class="primary-navbar secondary--navbar">
            <div class="container">
               <div class="row">
                  <div class="col-12">
                     <nav class="navbar p-0">
                        <div class="navbar__logo">
                           <a href="index.php" aria-label="go to home">
                              <img src="assets/images/logo/FoxStudio-tiny-strong.png" alt="Image">
                           </a>
                        </div>
                        <div class="navbar__options">
                           <button class="open-offcanvas-nav d-flex" aria-label="toggle mobile menu"
                              title="open offcanvas menu"></button>
                        </div>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
      </header>
      
<div class="offcanvas-nav">
         <div class="offcanvas-menu">
            <nav class="offcanvas-menu__wrapper">
               <div class="offcanvas-menu__header nav-fade">
                  <div class="logo">
                     <a href="index.php">
                        <img src="assets/images/logo/large-logo-strong.png" alt="" title="">
                     </a>
                  </div>
                  <a href="javascript:void(0)" aria-label="close offcanvas menu" class="close-offcanvas-menu">
                     <i class="fa-light fa-xmark-large"></i>
                  </a>
               </div>
               <div class="offcanvas-menu__list">
                  <div class="navbar__menu">
                     <ul >
                        <li class="navbar__item nav-fade">
                           <a href="index.php">Inicio</a>
                        </li>
                        <li class="navbar__item nav-fade">
                           <a href="nosotros.php">Nosotros</a>
                        </li>
                        <li class="navbar__item nav-fade">
                        <a href="servicios.php">Servicios</a>
                        </li>
                        <li class="navbar__item nav-fade">
                        <a href="contacto.php">Contacto</a>
                        </li>
                     </ul>
                  </div>
               </div>

               <div class="offcanvas-menu__options nav-fade">
                  <div class="offcanvas__mobile-options d-flex">
                     <a href="contacto.php" class="btn btn--secondary">Hablemos</a>
                  </div>
               </div>
               <div class="offcanvas-menu__social social nav-fade">
                  <a href="https://www.instagram.com/foxstudioarg" target="_blank" aria-label="Seguinos en instagram">
                     <i class="fa-brands fa-instagram"></i>
                  </a>
               </div>
            </nav>
         </div>
      </div>




            <!-- ==== mobile menu start ==== -->
            <div class="mobile-menu">
               <nav class="mobile-menu__wrapper">
                  <div class="mobile-menu__header nav-fade">
                     <div class="logo">
                        <a href="index.html">
                           <img src="assets/images/logo.png" alt="" title="">
                        </a>
                     </div>
                     <a href="javascript:void(0)" aria-label="close mobile menu" class="close-mobile-menu">
                        <i class="fa-light fa-xmark-large"></i>
                     </a>
                  </div>
                  <div class="mobile-menu__list"></div>
                  <div class="mobile-menu__options d-flex d-sm-none justify-content-center nav-fade"></div>
                  <div class="mobile-menu__social social nav-fade">
                     <a href="https://www.instagram.com/foxstudioarg/" target="_blank" aria-label="Compartinos en Instagram">
                        <i class="fa-brands fa-instagram"></i>
                     </a>
                     <a href="mailto:info@foxstudio.com.ar" target="_blank" aria-label="Envianos un e-mail">
                        <i class="fa-sharp fa-solid fa-envelope"></i>
                     </a>
                     <a href="https://wa.me/5491139398075" target="_blank" aria-label="Envianos un mensaje">
                        <i class="fa-brands fa-solid fa-whatsapp"></i>
                     </a>
                  </div>
               </nav>
            </div>
            <div class="mobile-menu__backdrop"></div>
            <!-- ==== / mobile menu end ==== -->
         </div>
      </header>
      <!-- ==== / header end ==== -->
      <div id="smooth-wrapper">
         <div id="smooth-content">
            <!-- ==== main start ==== -->
            <main>
               <!-- ==== banner start ==== -->
               <section class="cmn-banner bg-img" data-background="assets/images/banner/cmn-banner-bg.png">
                  <div class="container">
                     <div class="row gaper align-items-center">
                        <div class="col-12 col-lg-5 col-xl-7">
                           <div class="text-center text-lg-start">
                              <h2 class="title title-anim">Error</h2>
                              <nav aria-label="breadcrumb">
                                 <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                       <a href="index.html">
                                          <i class="fa-solid fa-house"></i>
                                          Home
                                       </a>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">
                                       Error
                                    </li>
                                 </ol>
                              </nav>
                           </div>
                        </div>
                        <div class="col-12 col-lg-7 col-xl-5">
                           <div class="text-center text-lg-start">
                              <p class="primary-text">Somos nativos digitales apasionados por la innovación y la creatividad, dedicados a desarrollar soluciones tecnológicas que optimizan tiempo y recursos. Nuestra cultura asegura que cada proyecto no solo cumpla, sino que supere las expectativas, combinando estrategias alineadas con claridad operativa y un enfoque eficaz.
</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
               <!-- ==== / banner end ==== -->
               <!-- ==== error start ==== -->
               <section class="section error fade-wrapper">
                  <div class="container">
                     <div class="row justify-content-center">
                        <div class="col-12 col-xl-7">
                           <div class="error__content text-center fade-top">
                              <span class="secondary-text">ERROR</span>
                              <div class="thumb">
                                 <img src="assets/images/error-thumb.png" alt="Image">
                              </div>
                              <h2>No se encontró</h2>
                              <div class="section__content-cta">
                                 <a href="index.php" class="btn btn--secondary">Home</a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
               <!-- ==== / error end ==== -->
            </main>
            <!-- ==== / main end ==== -->
             
            
<?php include 'php/footer.php'; ?>